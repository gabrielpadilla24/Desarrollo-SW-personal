export class Serie {
    id;
    name;
    channel;
    seasons;
    image;
    description;
    link;
    constructor(id, name, channel, seasons, image, description, link) {
        this.id = id;
        this.name = name;
        this.channel = channel;
        this.seasons = seasons;
        this.image = image;
        this.description = description;
        this.link = link;
    }
}