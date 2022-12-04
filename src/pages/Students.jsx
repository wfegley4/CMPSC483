import React from 'react'
import DashboardWrapperRest, { DashboardWrapperMainRest, DashboardWrapperRight } from '../components/dashboard-wrapper-rest/DashboardWrapperRest'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box-students/SummaryBoxStudents'
import { colors, data2 } from '../constants'





const Students = () => {
    return (
        <DashboardWrapperRest>
            <DashboardWrapperMainRest>
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="row">
                            {
                                data2.summary.map((item, index) => (
                                    <div key={`summary-${index}`} className="col-4 col-md-6 col-sm-12 mb">
                                        <SummaryBox item={item} />
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                    
                </div>


            </DashboardWrapperMainRest>
            
            
        </DashboardWrapperRest>
        
    )
}

export default Students
