import React from 'react'
import DataChart from '../pages/dataChart';
import PageManagement from '../pages/pageManagement';
import RightsManagement from '../pages/rightsManagement';
import normalUser from '../pages/normalUser';
import ReportArticle from '../pages/reportArticle';
import ReportResource from '../pages/reportResource';
import ReportComments from '../pages/reportComments';
import ArticleManagement from '../pages/articleManagement';
import ResourceManagement from '../pages/resourceManagement';
import internalPerson from '../pages/internalPerson';
import {Route} from 'react-router-dom'

  class RouterMap extends React.Component{
      render(){
          return(
            <div>
                <Route path="/" exact component={ DataChart } />
                <Route path="/pageManagement" component={ PageManagement } />
                <Route path="/articleManagement" component={ ArticleManagement } />
                <Route path="/resourceManagement" component={ ResourceManagement } />
                <Route path="/reportManagement/article" component= {ReportArticle} />
                <Route path="/reportManagement/resource" component = { ReportResource }/>
                <Route path="/reportManagement/comments" component = { ReportComments }/>
                <Route path="/rightsManagement" component={ RightsManagement }/>
                <Route path="/userManagement/normalUser" component={ normalUser }/>
                <Route path="/userManagement/internalPerson" component={ internalPerson }/>
            </div>
        )
      }
  }
  export default RouterMap;