
export default class ArrayX {
   static sort(arr, funcCmp) {
        return arr.sort(
            function(a,b) {
                return funcCmp(a) - funcCmp(b);
            }
        );
   }
}