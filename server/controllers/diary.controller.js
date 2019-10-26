
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


export const getAllDiaries = (req, res) => {
    return res.json({
        status: 200,
        data: diaries
    });
};


export const deleteEntries = (req, res) => {

    const diary = diaries.findIndex(diary => diary.id == req.params.id);

    if (diary == -1) return res.status(404).send('The  Diary with given ID are not found');

    //Removes elements from an array and, if necessary, inserts new elements.
    diaries.splice(Diary, 1);

    return res.status(200).json({
        status: 200,
        message: "Entry successfully deleted ",
    });
}