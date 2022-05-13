import {token, formatDate} from './api';
// Check if it passes new date yet or no
var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0, 0) - now;
if (millisTill10 < 0) {
    millisTill10 += 86400000; // it's after 23:59, try 23:59 tomorrow.
}
setTimeout(function(){alert("It's 23am!")}, millisTill10);

function checkStreaks(){
    var today = new Date(formatDate());
    var his_list = null;
    // loop through history table where watchDate == today and watched != true
    const query = qs.stringify({
        filters: {
            $and: [{
                watchDate:{
                    $eq: today,
                },
                watched: {
                    $eq: true,
                },
            },],
        },
    }, {
        encodeValuesOnly: true,
    });

    axios.get(bathURL + '/histories?' + query,{
    headers: {
        Authorization:
        `Bearer ${token}`,
    },
    }).then(({data}) => {
        // then store in an array
        his_list = data.data;
    });

    if(his_list != null){
        his_list.map((history) => {
            var id = history.attributes.userId;
            const query = qs.stringify({
                filters: {
                    userId: id,
                },
            }, {
                encodeValuesOnly: true,
            });
            axios({
                method: 'PUT',
                url: bathURL + '/coins?' + query,
                data: {
                "data": {
                    streaks: 0,
                }
                },
                headers: {
                Authorization:
                    `Bearer ${token}`,
                },
            });
        })
    }
} 