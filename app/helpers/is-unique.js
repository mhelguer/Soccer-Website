import { helper } from '@ember/component/helper';

export default helper(function isUnique(param) {
  if(!param._uniqueValues){
    param._uniqueValues={};
  }
  
  if(!param._uniqueValues[value]){
    param._uniqueValues[value] = true;
    return param;
  }
});
