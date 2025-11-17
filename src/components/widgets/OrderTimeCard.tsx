import React from 'react';
import Card from '../ui/Card';
import ReactECharts from 'echarts-for-react';

const OrderTimeCard: React.FC = () => {
  const option = {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Order Time',
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: false } },
        labelLine: { show: false },
        data: [
          { value: 40, name: 'Afternoon', itemStyle: { color: '#5A6ACF' } },
          { value: 32, name: 'Evening', itemStyle: { color: '#8593ED' } },
          { value: 28, name: 'Morning', itemStyle: { color: '#C7CEFF' } },
        ],
      },
    ],
  };

  const legendData = [
    { name: 'Afternoon', value: '40%', color: 'bg-primary' },
    { name: 'Evening', value: '32%', color: 'bg-primary-lighter' },
    { name: 'Morning', value: '28%', color: 'bg-primary-lightest' },
  ];

  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-medium">Order Time</h2>
          <p className="text-gray-text text-sm">From 1-6 Dec, 2020</p>
        </div>
        <button className="text-primary text-xs font-medium border border-gray-200 rounded-md px-4 py-2 shadow-button bg-light-blue-bg hover:bg-gray-100 transition">View Report</button>
      </div>
      <div className="h-40 my-4">
        <ReactECharts option={option} style={{ height: '100%' }} />
      </div>
      <div className="flex justify-around text-center">
        {legendData.map(item => (
          <div key={item.name}>
            <div className="flex items-center justify-center text-xs text-dark-text/70">
              <span className={`w-2 h-2 ${item.color} rounded-full mr-2`}></span>
              {item.name}
            </div>
            <p className="font-medium text-sm mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OrderTimeCard;
