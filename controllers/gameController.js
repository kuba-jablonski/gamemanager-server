const catchAsync = require("../utils/catchAsync");
// const Backlog = require("../models/backlogModel");
// const AppError = require("../utils/appError");
const Game = require("../models/gameModel");

// exports.createGame = catchAsync(async (req, res, next) => {
//   const backlog = await Backlog.findOneAndUpdate(
//     { owner: req.user._id, "items.apiId": { $ne: req.body.apiId } },
//     { $push: { items: req.body } },
//     { new: true, runValidators: true }
//   );

//   if (!backlog) return next(new AppError("You already added this game.", 400));

//   res.status(200).json({ backlog });
// });

// exports.updateGame = catchAsync(async (req, res, next) => {
//   const backlog = await Backlog.findOneAndUpdate(
//     {
//       owner: req.user._id,
//       "items._id": req.params.gameId
//     },
//     {
//       $set: {
//         "items.$.logType": req.body.logType
//       }
//     },
//     {
//       new: true,
//       runValidators: true
//     }
//   );

//   if (!backlog)
//     return next(new AppError("No game with this ID waws found.", 404));

//   res.status(200).json({ backlog });
// });

// exports.daleteGame = catchAsync(async (req, res, next) => {
//   const backlog = await Backlog.findOneAndUpdate(
//     {
//       owner: req.user._id,
//       "items._id": req.params.gameId
//     },
//     {
//       $pull: {
//         items: {
//           _id: req.params.gameId
//         }
//       }
//     },
//     {
//       new: true,
//       runValidators: true
//     }
//   );

//   if (!backlog)
//     return next(new AppError("No game with this ID was found.", 404));

//   res.status(200).json({ backlog });
// });

exports.createGame = catchAsync(async (req, res, next) => {
  const game = await Game.findOneAndUpdate(
    { apiId: req.body.apiId, "holders.user": { $ne: req.user.id } },
    {
      name: req.body.name,
      apiId: req.body.apiId,
      $push: { holders: { user: req.user.id, logType: req.body.logType } }
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );

  res.status(201).json({ game });
});

// exports.setUserIds = (req, res, next) => {
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.getAllGames = catchAsync(async (req, res, next) => {
  const filter = {};

  const games = await Game.find(filter);

  res.status(200).json({ games });
});
