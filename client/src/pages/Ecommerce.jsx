import React, { useState, useEffect } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Stacked, Button, SparkLine } from '../components';
import { recentTransactions, dropdownData, SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs'; 
import { FiBarChart } from 'react-icons/fi'; 
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
  const [earnings, setEarnings] = useState(0); 
  const [learners, setLearners] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [Budget,setBudget]=useState(0);
  const [Expense,setExpense]=useState(0);
  const [stackedChartData,SetstackedChartData]=useState([]);
  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount:`${learners}`,
      title: 'Learners',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: `${instructors}`,
      title: 'Instructors',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    { 
      icon: <FiBarChart />,
      amount: `${courses}`,
      title: 'Courses',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get('http://localhost:8000/api/v1/users/income/2024');
        if (incomeResponse.data && incomeResponse.data.data) {
          const studentIncome = incomeResponse.data.data.student_income;
          const teacherIncome = incomeResponse.data.data.teacher_income;
  
          setStudentIncome(studentIncome);
          setTeacherIncome(teacherIncome);
  
          const totalStudentIncome = studentIncome.reduce((total, income) => total + income.income, 0);
          const totalTeacherIncome = teacherIncome.reduce((total, income) => total + income.income, 0);
          const totalEarnings = totalStudentIncome + totalTeacherIncome;
          setBudget(totalStudentIncome);
          setExpense(totalTeacherIncome);
          setEarnings(totalEarnings); 
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

  const updatedStudentGraphData = calculateTotalIncome(StudentIncome);
  const updatedTeacherGraphData = calculateTotalIncome(TeacherIncome);

  SetstackedChartData([updatedStudentGraphData, updatedTeacherGraphData]);
}, [StudentIncome, TeacherIncome]);


  return (
    <div className="mt-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-400">Earnings</p>
            <p className="text-2xl">₹{earnings}</p> 
          </div>
          <button
            type="button"
            style={{ backgroundColor: currentColor }}
            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
          >
            <BsCurrencyDollar />
          </button>
        </div>
        {earningData.map((item) => (
          <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg p-4 rounded-xl shadow-lg flex flex-col justify-between">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              {item.icon}
            </button>
            <p>
              <span className="text-lg font-semibold">{item.amount}</span>
              <span className={`text-sm text-${item.pcColor} ml-2`}>
                {item.percentage}
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-1">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
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
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex-1 pr-4">
            <div>
              <p>
                <span className="text-3xl font-semibold">₹{Budget}</span>
              </p>
              <p className="text-gray-500 mt-1">Budget</p>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-semibold">₹{Expense}</p>
              <p className="text-gray-500 mt-1">Expense</p>
            </div>
            <div className="mt-5">
              <SparkLine 
                currentColor={currentColor} 
                id="line-sparkLine" 
                type="Line" 
                height="80px" 
                width="100%" 
                data={SparklineAreaData} 
                color={currentColor} 
              />
            </div>
            <div className="mt-6">
              <Button
                color="white"
                bgColor={currentColor}
                text="Download Report"
                borderRadius="10px" 
              />
            </div>
          </div>
          <div className="flex-1">
            <Stacked 
              currentMode={currentMode} 
              width="100%" 
              height="360px" 
              stackedChartData={stackedChartData} 
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 m-4">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 rounded-2xl shadow-lg w-full">
          <div className="flex justify-between items-center gap-2 mb-4">
            <p className="text-xl font-semibold">Recent Transactions</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-6 w-full">
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
