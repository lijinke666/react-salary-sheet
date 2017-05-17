export default {
    toQueryPair: function(key, value) {
        if (typeof value == 'undefined'){
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    },

    toQueryString(obj){
        var ret = [];
        for(var key in obj){
            key = encodeURIComponent(key);
            var values = obj[key];
            if(values && values.constructor == Array){//数组
                var queryValues = [];
                for (var i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            }else{
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    },

    toQueryParams: function(){
        var search = this.replace(/^\s+/,'').replace(/\s+$/,'').match(/([^?#]*)(#.*)?$/);
        if(!search){
            return {};
        }
        var searchStr  = search[1];
        var searchHash = searchStr.split('&');

        var ret = {};
        for(var i = 0, len = searchHash.length; i < len; i++){
            var pair = searchHash[i];
            if((pair = pair.split('='))[0]){
                var key   = decodeURIComponent(pair.shift());
                var value = pair.length > 1 ? pair.join('=') : pair[0];
                
                if(value != undefined){
                    value = decodeURIComponent(value);
                }
                if(key in ret){
                    if(ret[key].constructor != Array){
                        ret[key] = [ret[key]];
                    }
                    ret[key].push(value);
                }else{
                    ret[key] = value;
                }
            }
        }
        return ret;
    }
}