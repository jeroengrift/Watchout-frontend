export class Movie {
    constructor(
    public id: number,
    public youtubeId: string,
    public name: string,
    public rating: number,
    public description: string,
    public lon: number,
    public lat: number,
    ) 
    {}
}