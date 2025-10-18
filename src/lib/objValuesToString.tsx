export default function objValuesToString(myObject: geoResults): SearchObject {
  for (const key in myObject) {
    if (Object.prototype.hasOwnProperty.call(myObject, key)) {
      myObject[key] = myObject[key] + "";
    }
  }
  return myObject as SearchObject;
}
