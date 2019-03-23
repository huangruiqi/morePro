const DataState = {
    error:null,
    data:null
}
const lineChartData = (state = DataState,action={})=>{
    console.log(action.data);
    switch(action.type){
        case "FETCH_LINECHARTDATA_SUCCEED":
            return{
                error:null,
                data:action.data
            }
        case "FECTH_LINECHARTDATA_FAILURE":
            return{
                error:action.error,
                data:null
            }
        default: return state
    }
}
export default lineChartData;
