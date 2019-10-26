
export const  Diary = class Diary {
    constructor(id, title, description){
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdOn = new Date();
    }
}