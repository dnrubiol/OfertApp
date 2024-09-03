import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const genOptions = (title) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: title,
      },
    }
  }
};

class PieChart extends React.Component {
  render() {
    return <Pie data={this.props.data} options={genOptions(this.props.title)}/>;
  }
}

export default PieChart;
