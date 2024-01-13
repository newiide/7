import { useContext } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods/goods';



const CounterComponent = () => {
  const { data, addGoods, selectedGoods } = useContext(GoodsContext);

  let start = null;

  const autoDetectButton = (props) => {
    let { arr, i = 0, sumForAuto = 0, result = [] } = props;

    const newSum = sumForAuto + arr[i].cost;
    console.log(newSum);

    if (newSum === 40) {
      result.push(i);
      result.forEach((index) => {
        if (!selectedGoods.some((item) => item.id === data[index].id)) {
          addGoods(data[index]);
        }
      });
      console.log(result);

      return result;
    }

    if (i === arr.length - 1) {
      console.log(result);
      return result;
    }

    if (newSum < 40) {
      result.push(i);
      return autoDetectButton({
        i: i + 1,
        arr,
        sumForAuto: newSum,
        result,
      });
    }

    if (newSum > 40) {
      result.length = 0;
      start = start + 1;
      console.log(result);
      return autoDetectButton({
        i: start,
        arr,
        sumForAuto: 0,
        result,
      });
    }
  };

  const handleAutoDetect = () => {
    data.sort((a, b) => a.cost - b.cost);
    console.log(data);
    autoDetectButton({ arr: data });
  };

  const sum = selectedGoods.reduce((acc, cur) => acc + cur.cost, 0);

  return (
    <div className='cost-wrapper'>
      <div>{sum}/40</div>
      <div className='auto-detect' onClick={handleAutoDetect}>
        Auto-detect
      </div>
      <div className='selected-goods'>
        {selectedGoods.map((el) => (
          <GoodsComponent {...el} key={'selected' + el.id} />
        ))}
      </div>
    </div>
  );
};

export default CounterComponent;
