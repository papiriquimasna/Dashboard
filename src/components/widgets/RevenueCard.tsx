import React from 'react';
import Card from '../ui/Card';
import ReactECharts from 'echarts-for-react';
import { ArrowUp } from 'lucide-react';

const RevenueCard: React.FC = () => {
  const option = {
    grid: { left: 0, right: 0, top: 10, bottom: 20 },
    xAxis: {
      type: 'category',
      data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#737B8B' }
    },
    yAxis: {
      type: 'value',
      splitLine: { 
        show: true,
        lineStyle: {
            type: 'dashed',
            color: '#E2E7E7'
        }
      },
      axisLabel: { show: false }
    },
    series: [
      {
        name: 'Last 6 days',
        type: 'bar',
        data: [90, 70, 80, 60, 100, 110, 75, 65, 95, 85, 105, 120],
        itemStyle: { color: '#5A6ACF', borderRadius: [4, 4, 0, 0] },
        barWidth: '20%',
      },
      {
        name: 'Last Week',
        type: 'bar',
        data: [50, 40, 40, 80, 70, 50, 45, 90, 55, 65, 75, 60],
        itemStyle: { color: '#E6E8EC', borderRadius: [4, 4, 0, 0] },
        barWidth: '20%',
      }
    ],
    tooltip: { trigger: 'axis' }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-medium">Revenue</h2>
          <p className="text-3xl font-medium mt-1">IDR 7.852.000</p>
          <div className="flex items-center text-green-stat text-xs font-bold mt-2">
            <ArrowUp size={14} className="mr-1"/>
            <span>2.1% vs last week</span>
          </div>
        </div>
        <button className="text-primary text-xs font-medium border border-gray-200 rounded-md px-4 py-2 shadow-button bg-light-blue-bg hover:bg-gray-100 transition">View Report</button>
      </div>
      <p className="text-gray-text text-sm mb-4">Sales from 1-12 Dec, 2020</p>
      <div className="h-48">
        <ReactECharts option={option} style={{ height: '100%' }} />
      </div>
      <div className="flex items-center space-x-6 mt-4 text-xs text-dark-text/70">
          <div className="flex items-center"><span className="w-2.5 h-2.5 bg-primary rounded-full mr-2"></span>Last 6 days</div>
          <div className="flex items-center"><span className="w-2.5 h-2.5 bg-gray-border rounded-full mr-2"></span>Last Week</div>
      </div>
    </Card>
  );
};

export default RevenueCard;
