const TimeStamp = function(){
  this.makeTimeStamp = ()=>{
    const raw = new Date();
    const Y   = raw.getFullYear();
    const m   = raw.getMonth() + 1;
    const d   = raw.getDate();
    const H   = ( raw.getHours()   < 10 ) ? "0" + raw.getHours()   : raw.getHours();
    const i   = ( raw.getMinutes() < 10 ) ? "0" + raw.getMinutes() : raw.getMinutes();
    const S   = ( raw.getSeconds() < 10 ) ? "0" + raw.getSeconds() : raw.getSeconds();

    return `${Y}/${m}/${d} ${H}:${i}:${S}`;
  },

  this.makeYesterday = ()=>{
    const raw = new Date();
    const yesterday = new Date(raw.getFullYear(), raw.getMonth(), raw.getDate() - 1);

    const Y   = yesterday.getFullYear();
    const m   = yesterday.getMonth() + 1;
    const d   = yesterday.getDate();
    const H   = ( yesterday.getHours()   < 10 ) ? "0" + yesterday.getHours()   : yesterday.getHours();
    const i   = ( yesterday.getMinutes() < 10 ) ? "0" + yesterday.getMinutes() : yesterday.getMinutes();
    const S   = ( yesterday.getSeconds() < 10 ) ? "0" + yesterday.getSeconds() : yesterday.getSeconds();

    return `${Y}/${m}/${d}`;
  },

  this.makeTime = () => {
    const raw = new Date();
    const H  = ( raw.getHours()   < 10 ) ? "0" + raw.getHours()   : raw.getHours();
    const i  = ( raw.getMinutes() < 10 ) ? "0" + raw.getMinutes() : raw.getMinutes();

    return `${H}:${i}`;

  };
};

module.exports = function(){
  return new TimeStamp();
}();
