import React from 'react'
import Statcard from '../component/dashboard/statcard'
import stats from '../component/dashboard/statdata'


function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold  text-gray-950">Dashboard Overview</h1>
      <div className ="flex items-center justify-between hrms/src/assets/pexels-mikhail-nilov-6893376.jpg ">
        {stats.map((item, index)=>{
          return (
            <Statcard
              key={index}
              title={item.title}
              count={item.count}
              icon={item.icon}
              color={item.color}
            />
          )
        })}
      </div>
    </>
  )
}

export default Dashboard
