import React, { useState, useEffect } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, recentTransactions, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent 
      id="time" 
      fields={{ text: 'Time', value: 'Id' }} 
      style={{ border: 'none', color: currentMode === 'Dark' ? 'white' : 'black' }} 
      value="1" 
      dataSource={dropdownData} 
      popupHeight="220px" 
      popupWidth="120px" 
    />
  </div>
);
 
const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  const [StudentIncome, setStudentIncome] = useState([]);
  const [TeacherIncome, setTeacherIncome] = useState([]);
  const [studentGraphData, setStudentGraphData] = useState([]);
  const [teacherGraphData, setTeacherGraphData] = useState([]);
  const [netIncomeGraphData, setNetIncomeGraphData] = useState([]);
  const [earnings, setEarnings] = useState(0); 
  const [learners, setLearners] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get('http://localhost:8000/api/v1/users/income/2024');
        if (incomeResponse.data && incomeResponse.data.data) {
          setStudentIncome(incomeResponse.data.data.student_income);
          setTeacherIncome(incomeResponse.data.data.teacher_income);
        } else {
          console.error('Income data is not found in the response');
        }

        const dashboardResponse = await axios.get('http://localhost:8000/api/v1/users/dashboard');
        if (dashboardResponse.data && dashboardResponse.data.data) {
          const { learners, teachers, courses } = dashboardResponse.data.data;
          setLearners(learners || []);
          setInstructors(teachers || []); 
          setCourses(courses || []);
        } else {
          console.error('Dashboard data is not found in the response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalIncome = (data) => {
      const incomeByMonth = data.reduce((acc, curr) => {
        const { month, income } = curr;
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += income;
        return acc;
      }, {});

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames.map((month) => ({
        x: month,
        y: incomeByMonth[month] || 0,
      }));
    };

    setStudentGraphData(calculateTotalIncome(StudentIncome));
    setTeacherGraphData(calculateTotalIncome(TeacherIncome));
  }, [StudentIncome, TeacherIncome]);

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">${earnings.toLocaleString()}</p> 
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-6 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl shadow-lg">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-6 rounded-2xl shadow-lg md:w-780">
          <div className="flex justify-between items-center mb-6">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <GoPrimitiveDot />
                <span>Instructors</span>
              </p> 
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <GoPrimitiveDot />
                <span>Learners</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="border-r-1 border-color pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,487</p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>
              <div className="mt-5">
                <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={currentColor} />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px" 
                />
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 m-4">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center gap-2 mb-6">
            <p className="text-xl font-semibold">Recent Transactions</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between items-center mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;

