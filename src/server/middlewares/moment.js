const db = require('../models/db_global');
const Moment = db.Moment;

module.exports = {
  createMoment (type, desc, extras, sid, uid) {
    let momentData = {
      type: type,
      desc: desc,
      extras: JSON.stringify(extras),
      student_id: sid,
      uid: uid
    };
    Moment.create(momentData)
      .then(function () {
        console.log('moment: ' + uid + ' create successful');
      })
      .catch(function (e) {
        console.log(momentData);
        console.error(e);
        console.log('moment: ' + uid + ' create failed');
      });
  },
  addCoverToArticleMoment (id, cover) {
    Moment.findOne({
      where: {
        uid: id
      }
    })
      .then(function (moment) {
        let oExtras = JSON.parse(moment.dataValues.extras);
        oExtras.cover = cover;
        Moment.update({
          extras: JSON.stringify(oExtras)
        }, {
          where: {
            uid: id
          }
        })
          .then(function () {
            console.log('moment: ' + id + ' add cover successful');
          })
          .catch(function (e) {
            console.error(e);
            console.log('moment: ' + id + ' add cover failed');
          });
      })
      .catch(function (e) {
        console.error(e);
        console.log('moment: ' + id + ' add cover failed');
      });
  },
  validatePlanMoment (id, status) {
    Moment.findOne({
      where: {
        uid: id
      }
    })
      .then(function (moment) {
        let oExtras = JSON.parse(moment.dataValues.extras);
        oExtras.status = status;
        Moment.update({
          extras: JSON.stringify(oExtras)
        }, {
          where: {
            uid: id
          }
        })
          .then(function () {
            console.log('moment: ' + id + ' validate successful');
          })
          .catch(function (e) {
            console.error(e);
            console.log('moment: ' + id + ' validate failed');
          });
      })
      .catch(function (e) {
        console.error(e);
        console.log('moment: ' + id + ' validate failed');
      });
  },
  createPlanModifyMoment (type, desc, extras, sid, uid) {
    let _this = this;
    let oExtras = JSON.parse(JSON.stringify(extras));
    oExtras.status = '已修改';
    Moment.update({
      extras: JSON.stringify(oExtras),
      uid: 'm_' + uid
    }, {
      where: {
        uid: uid
      }
    })
      .then(function () {
        _this.createMoment(type, desc, extras, sid, uid);
        console.log('moment: ' + uid + ' modify successful');
      })
      .catch(function (e) {
        console.error(e);
        console.log('moment: ' + uid + ' modify failed');
      });
  },
  labelsMod (labels, uid) {
    Moment.findOne({
      where: {
        uid: uid
      }
    })
      .then(function (moment) {
        let oExtras = JSON.parse(moment.dataValues.extras);
        oExtras.labels = labels;
        Moment.update({
          extras: JSON.stringify(oExtras),
        }, {
          where: {
            uid: uid
          }
        })
          .then(function () {
            console.log('moment: ' + uid + ' modify label successful');
          })
          .catch(function (e) {
            console.error(e);
            console.log('moment: ' + uid + ' modify label failed');
          });
      })
      .catch(function (e) {
        console.error(e);
      });
  },
  deleteMoment (uid) {
    Moment.destroy({
      where: {
        uid: uid
      }
    })
      .then(function () {
        console.log('moment: ' + uid + ' delete successful');
      })
      .catch(function (e) {
        console.error(e);
        console.log('moment: ' + uid + ' delete failed');
      });
  }
};
