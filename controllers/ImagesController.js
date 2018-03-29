const { INTERNAL_SERVER_ERROR, OK } = require('http-status-codes');

const EventLoggerRepository = require('../repositories/EventLoggerRepository');
const ImagesRepository = require('../repositories/ImagesRepository');
const ApiError = require('../constants/ApiError');
const LogTypeConstants = require('../constants/LogTypeConstants');

exports.GET = (req, res) => {
  ImagesRepository.findAll((error, images) => {
    if (error) {
      EventLoggerRepository.create(
        LogTypeConstants.error,
        req,
        error,
        res.statusCode
      );
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send(error);
    }
    res.status(OK).json(images);
  });
};
