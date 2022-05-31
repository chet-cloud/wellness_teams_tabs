import axios from "axios";
import auth_teams from "./auth_teams.js"
import auth_web from "./auth_web.js"
import auth_checkInTeams from "./auth_checkInTeams.js"

let bathURL = "http://localhost:1337/api"
bathURL = "https://strapiareit.azurewebsites.net/api"
var token = null;
var info = null;
var qs = require('qs');

const setToken = (isProduct)=>{
  if(isProduct){
    const auth = auth_checkInTeams()?auth_teams:auth_web
    return auth().then((profile)=>{
      info = profile.user;
      token = profile.jwt
      getCat().then( ({data}) => {
        var test = data.data;
        test.forEach((cat) => {
            addPref(info.username, cat.id);
        });
      });
    })
  }else{
    return axios.post( bathURL + '/auth/local', {
      identifier: 'wellness_app',
      password: 'dm0uRN21rNx91rQ9',
    })
    .then((response) => {
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      token = response.data.jwt;
    })
  }
}


function getCat(){
  return axios.get(bathURL + '/categories?populate=icon',{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });
}

function addPref(userId, catId, liked){
  const query = qs.stringify({
    filters: {
      category: {
        id: {
          $eq: catId,
        }
      },
      userId: {
        $eq: userId,
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  // debugger
  return axios.get(bathURL + '/preferences?' + query,{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }).then(({data}) => {
    // debugger
    var check = data.data;
    if(check.length === 0){
      // debugger
      return axios({
        method: 'POST',
        url: bathURL + '/preferences',
        data: {
          "data": {
            userId: userId,
            liked: liked,
            category: catId,
          }
        },
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      })
    }else{
      return axios({
        method: 'PUT',
        url: bathURL + '/preferences/' + check[0].id,
        data: {
          data: {
            userId,
            liked,
            catId
          }
        },
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      })
    }
  })
}

async function getPref(userId){
  const query = qs.stringify({
    filters: {
      userId: {
        $eq: userId,
      },
    },
    populate: ['category'],
  }, {
    encodeValuesOnly: true,
  });
  // debugger
  return await axios.get(bathURL + '/preferences?' + query,{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });
}

function randomize(list){
  return Math.floor(Math.random() * list.length);
}

function forceCreatCat(catId,userId,liked,entry){

  axios.get(bathURL + '/preferences?' + qs.stringify({
    filters: {
      id: {
        $eq: entry,
      },
    },
    populate: ['category'],
  }, {
    encodeValuesOnly: true,
  }),{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }).then(({data})=>{
      if(data.length === 0){
        addPref(userId, catId)
      }else{
        likeCat(userId, catId, liked, entry)
      }
  })

}


function likeCat(userId, catId, liked, entry){
  // debugger
  return axios({
    method: 'PUT',
    url: bathURL + '/preferences/' + entry,
    data: {
      data: {
        userId,
        liked,
        catId
      }
    },
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  })
}

async function getVideo(userId, type = null){
  var query = null;
  switch(type){
    case 'visited':
      var vidId = null;
      await checkHis(userId).then(({data}) => {
        // grab vidId from history
        var his = data.data;
        vidId = his[0].attributes.video.data.id;
      });

      query = qs.stringify({
        filters: {
          id: {
            $eq: vidId,
          },
        },
        populate: [
          'category',
          'tags',
        ],
      }, {
        encodeValuesOnly: true,
      });
      return await axios.get(bathURL + '/videos?' + query,{
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });
    default:
      var fav_list = [];
      var vid_list = [];
      // Get user preference list (store it into an array)
      query = qs.stringify({
        filters: {
          $and: [{
            userId: {
              $eq: userId,
            },
            liked: {
              $eq: true,
            },
          },],
        },
        populate: ['category'],
      }, {
        encodeValuesOnly: true,
      });
      // debugger
      await axios.get(bathURL + '/preferences?' + query,{
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }).then(({data}) => {
        fav_list = data.data;
      })
      // Randomly pick a category from those that user liked (store that catId into a variable)
      var picked_cat = [];
      if(fav_list.length === 0){
        getCat().then(({data}) => {
          var default_list = data.data;
          picked_cat = default_list[randomize(default_list)].id;
        })
      }else{
        picked_cat = fav_list[randomize(fav_list)].attributes.category.data.id;
      }

      // Get a list of videos that's under that category (add a filter with condition: status == 'approved') (store them in an array)
      query = qs.stringify({
        filters: {
          $and: [{
            category: {
              id: {
                $eq: picked_cat,
              }
            },
            // approved: {
            //   $eq: true,
            // },
          },],
        },
        populate: ['category'],
      }, {
        encodeValuesOnly: true,
      });
      await axios.get(bathURL + '/videos?' + query,{
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }).then(({data}) => {
        vid_list = data.data;
      });
      // Pick a random video from that list then return the data list
      var picked_vid = vid_list[randomize(vid_list)].id;

      query = qs.stringify({
        filters: {
          id: {
            $eq: picked_vid,
          },
        },
        populate: [
          'category',
          'tags',
        ],
      }, {
        encodeValuesOnly: true,
      });
      return await axios.get(bathURL + '/videos?' + query,{
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });
  }
}

function getHis(userId, vidId){
  const query = qs.stringify({
    filters: {
      $and: [{
        video:{
          id:{
            $eq: vidId,
          },
        },
        userId: {
          $eq: userId,
        },
      },],
    },
    pagination: {
      limit: 1,
    },
    populate: [
      'video',
      'tags',
    ],
  }, {
    encodeValuesOnly: true,
  });

  return axios.get(bathURL + '/histories?' + query,{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });
}

function checkHis(userId){
  var today = new Date();
  const query = qs.stringify({
    filters: {
      $and: [{
        watchDate:{
          $eq: today,
        },
        userId: {
          $eq: userId,
        },
      },],
    },
    pagination: {
      limit: 1,
    },
    populate: [
      'video',
      'tags',
    ],
  }, {
    encodeValuesOnly: true,
  });

  return axios.get(bathURL + '/histories?' + query,{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });
}

function formatDate(){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}-${month}-${date}`

}

function addHistory(userId, vidId){
  var today = new Date();
  var defaultVal = null;

  getHis(userId, vidId).then(({data}) => {
    var check = data.data;
    if(check.length === 0){
      axios({
        method: 'POST',
        url: bathURL + '/histories',
        data: {
          "data": {
            userId: userId,
            liked: defaultVal,
            watched: defaultVal,
            watchDate: today,
            video: vidId,
          }
        },
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      })
    }
    return false;
  })
}

function updateHistory(entry, liked = null, watched = null){
  //document.body.style.pointerEvents = "none";
  if(watched != null){
    return axios({
      method: 'PUT',
      url: bathURL + '/histories/' + entry,
      data: {
        "data": {
          watched: watched,
        }
      },
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
  }else{
    return axios({
      method: 'PUT',
      url: bathURL + '/histories/' + entry,
      data: {
        "data": {
          liked: liked,
        }
      },
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
  }
}

function getSaved(userId){
  const query = qs.stringify({
    filters: {
      userId: {
        $eq: userId,
      },
      liked: {
        $eq: true,
      }
    },
    populate: {
      video: {
        populate: [
          'vid_thumb',
          'tags',
        ],
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  return axios.get(bathURL + '/histories?' + query,{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });
}

function getCoins(userId){
  const query = qs.stringify({
    filters: {
      userId: {
        $eq: userId,
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  return axios.get(bathURL + '/coins?' + query,{
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });
}

function addCoin(userId){
  var defaultVal = 1;
  getCoins(userId).then(({data}) => {
    var check = data.data;
    if(check.length === 0){
      axios({
        method: 'POST',
        url: bathURL + '/coins',
        data: {
          "data": {
            userId: userId,
            amount: defaultVal,
            streaks: defaultVal,
          }
        },
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }).then(console.log);
    }else{
      var coin = check[0].attributes.amount;
      var streak = check[0].attributes.streaks;
      coin++;
      streak++;
      axios({
        method: 'PUT',
        url: bathURL + '/coins/' + check[0].id,
        data: {
          "data": {
            amount: coin,
            streaks: streak,
          }
        },
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });
    }
    return false;
  });
}

export {info, token, formatDate};
export { setToken, getCat, addPref, getPref, likeCat, getVideo, getHis, addHistory, updateHistory, checkHis, getSaved, addCoin, getCoins }