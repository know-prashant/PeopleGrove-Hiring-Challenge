export default function validateEmail(emailField){
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(emailField) === false)
  {
      return false;
  }
  return true;
}

export function toShortFormat(date) {

    var month_names = ["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];

    var day = date.getDate();
    var month_index = date.getMonth();
    var year = date.getFullYear();

    return "" + day + "-" + month_names[month_index] + "-" + year;
}

export function groupBy( array , f )
{
  var groups = {};
  array.forEach( function( o )
  {
    var group = JSON.stringify( f(o) );
    groups[group] = groups[group] || [];
    groups[group].push( o );
  });
  return Object.keys(groups).map( function( group )
  {
    return groups[group];
  })
}
