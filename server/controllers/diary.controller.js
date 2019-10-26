
import  { Diary } from "../models/diary.model";
import  { diaries } from "../db/db";


export const createEntry = (req, res) => {

    if (!req.body.title || !req.body.description) {
        //bad request
        res.json({
            status: 400,
            error: "title and description are required"
        });
        return;
    }

    const diary = new Diary(req.body.id, req.body.title, req.body.description);

    diaries.push(diary);

    res.status(201).json({
        status: 201,
        message: "Entry successfully created"
    });
}
