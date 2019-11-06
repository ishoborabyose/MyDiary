import uuid from 'uuid';
import moment from 'moment';
import { Diary } from '../models/diary.model';
import { getEmail } from '../helpers/userdata';

export const createEntry = (req, res) => {
  if (!req.body.title || !req.body.description) {
    // bad request
    res.json({
      status: 400,
      error: 'title and description are required',
    });
    return;
  }
  const userEmail = getEmail(req.header('token'));
  const id = uuid.v1();
  const newdiary = {
    id,
    title: req.body.title,
    description: req.body.description,
    userEmail,
    createdOn: moment().format('llll'),
  };

  Diary.push(newdiary);
  const {
    title, description, createdOn, userId,
  } = newdiary;

  res.status(201).json({
    status: 201,
    data: {
      id,
      title,
      description,
      createdOn,
      userId,
      message: 'Entry successfully created',
    },
  });
};

export const getAllDiaries = (req, res) => res.json({
  status: 200,
  data: Diary,
});

export const deleteEntries = (req, res) => {
  const index = Diary.find((element) => element.id === req.params.id);

  if (!index) {
    return res.status(404).json({
      status: 404,
      error: 'not found',
    });
  }
  const userEmail = getEmail(req.header('token'));
  if (index.userEmail !== userEmail) {
    return res.status(403).json({
      status: 403,
      error: 'entry is incorrect',
    });
  }

  Diary.splice(Diary.indexOf(Diary), 1);

  return res.status(200).json({
    status: 200,
    message: 'Entry successfully deleted ',
  });
};

export const modifyEntry = (req, res) => {
  const index = Diary.find((element) => element.id === req.params.id);
  if (!index) {
    return res.status(404).json({
      status: 404,
      error: 'not found',
    });
  }

  const userEmail = getEmail(req.header('token'));
  if (index.userEmail !== userEmail) {
    return res.status(403).json({
      status: 403,
      error: 'entry is incorrect',
    });
  }

  index.title = req.body.title;
  index.description = req.body.description;
  return res.status(200).json({
    status: 200,
    message: 'Entry successfully edited',
    data: {
      index,
    },
  });
};
export const getDiaryById = (req, res) => {
  const index = Diary.find((element) => element.id === req.params.id);
  if (!index) {
    return res.status(404).json({
      status: 404,
      error: 'not found',
    });
  }
  if (index) {
    return res.status(200).json({
      status: 200,
      data: {
        index,
      },
    });
  }
  return res.status(401).send('No diary found match with provided id');
};
