import { useState } from 'react';
import * as uuid from 'uuid';
import GoodsComponent from './goods/goods';
import CounterComponent from './counter/counter';
import './style.css';
import GoodsMock from './goodsMock.json';
import GoodsContext from '../context/goods.context';
import CampComponent from './camp/camp';


const AppComponent = () => {

 const goods = GoodsMock.map(el => ({
    ...el,
    id: uuid.v1()
 }));

 const [data, setData] = useState(goods);
 const [selectedGoods, setSelectedGoods] = useState([]);

 const addGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return [...prevSelectedGoods, item];
  });
 };

 const removeGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return prevSelectedGoods.filter(el => {
    return item.id !== el.id;
   });
  });
 };

 const removeAllGoods = () => {
  setData((prevData) => {
   return prevData.filter(el => {
    const exists = selectedGoods.find(item => item.id == el.id);
    return !exists;
   });
  });
  setSelectedGoods([]);
 };

 return (
  <div className='app'>
   <div className='wrapper'>
    <GoodsContext.Provider value={{
     selectedGoods: selectedGoods,
     addGoods,
     removeGoods,
     removeAllGoods,
     data
    }}>
     <CounterComponent />
     <div className='goods-wrapper'>
      {
       data.map(el => {
        return <GoodsComponent {...el} key={el.id} />;
       })
      }
     </div>
     <CampComponent />
    </GoodsContext.Provider>
   </div>
  </div>
 );
};

export default AppComponent;;