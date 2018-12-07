import { Component, OnInit } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector, VectorTile } from 'ol/layer';
import { Vector as VectorSource, VectorTile as VectorTileSource } from 'ol/source';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { Projection } from 'ol/proj';
import { MVT } from 'ol/format';

import { Observable } from 'rxjs';
import { Movie } from 'src/app/domain/movie';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app-state.interface';
import * as movieActions from '../../store/movies/movies.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  movies: Observable<Movie[]>;
  features: Feature[] = new Array();
  current_projection = new Projection({ code: "EPSG:4326" });
  new_projection = new Projection({ code: "EPSG:3857" });

  constructor(private router: Router, private store: Store<IAppState>) { }

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  vector_source: VectorSource;
  vector_layer: Vector;
  fill: Fill;
  stroke: Stroke;
  style: Style;
  vector_tile: VectorTile;
  vector_tile_source: VectorTileSource;
  vector_mvt: MVT;

  ngOnInit() {
    this.getMovies();
  }

  prepareView(): void {

    this.source = new OlXYZ({
      url: 'http://tile.stamen.com/toner/{z}/{x}/{y}.png'
    });

    // this.vector_mvt = new MVT();

    // this.vector_tile_source = new VectorTileSource({
    //   format: this.vector_mvt,
    //   url: 'https://osm.tegola.io/maps/osm/{z}/{x}/{y}.pbf'
    // });

    // this.vector_tile = new VectorTile({
    //   source: this.vector_source
    // });

    this.layer = new OlTileLayer({
      source: this.source,
      projection: "EPSG:3857"
    });

    this.view = new OlView({
      center: fromLonLat([0, 30]),
      zoom: 2.7,
      minZoom: 2.7,
      maxZoom: 2.7

    });

    this.vector_source = new VectorSource({
      features: this.features
    });

    this.vector_layer = new Vector({
      source: this.vector_source,
      projection: "EPSG:3857",
    });

    this.fill = new Fill({
      color: [180, 0, 0, 0.3]
    });

    this.stroke = new Stroke({
      color: [180, 0, 0, 1],
      width: 1
    });

    this.style = new Style({
      image: new Circle({
        fill: this.fill,
        stroke: this.stroke,
        radius: 8
      }),
      fill: this.fill,
      stroke: this.stroke
    });

    this.vector_layer.setStyle(this.style);

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer, this.vector_layer],
      view: this.view
    });

    this.map.on('click', evt => {
      {
        var f = this.map.forEachFeatureAtPixel(
          evt.pixel,
          function (ft, layer) { return ft; }
        );
        var id = f.get('id');
        console.log(id);
        var base_url = "watch/"
        this.router.navigate([`${base_url}${id}`]);
      }
    });
  }

  getMovies() {
    this.store.dispatch(new movieActions.GetAll());
    this.movies = this.store.pipe(select(s => s.movies));

    this.movies.subscribe(data => {
      for (let movie of data) {

        let point = new Point([movie.lon, movie.lat]);
        point.transform(this.current_projection, this.new_projection);
        let feature = new Feature({
          type: 'click',
          geometry: point
        });
        feature.set('id', movie.id)
        this.features.push(feature)
      }
      this.prepareView();
    });
  }
}

