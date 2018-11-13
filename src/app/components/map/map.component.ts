import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../domain/movie';
import { Point } from 'ol/geom/Point';
import Map from 'ol/Map';
import XYZ  from 'ol/source/XYZ';
import TileLayer  from 'ol/layer/Tile';
import  View  from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { Vector } from 'ol/layer';
import { Feature } from 'ol/Feature';
import {GeoJSON} from 'ol/source';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  
    public source: XYZ = new XYZ({
    url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    public layer: TileLayer = new TileLayer({
    source: this.source
    });

    public view: View = new View({
    center: fromLonLat([0, 0]),
    zoom: 2.5,
    minZoom: 2.5
    });

    public map: Map = new Map({
    target: 'map',
    layers: [this.layer],
    view: this.view
    });

    constructor(){}
  
    ngOnInit() {}

    // var vectorLayer = new Vector({
    //   source: new GeoJSON({
    //     url: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_rivers_lake_centerlines.geojson'
    //   })
    // });
    
    // // Add Vector layer to map
    // this.map.addLayer(vectorLayer);

}




