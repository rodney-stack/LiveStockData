import React, { useEffect, useState } from 'react';

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const LiveStocks = (props) => {
    let calculatedObj = [];
    const [calObj, setCalObj] = useState([]);
    useEffect(() => {
        let beautifyObj = [];
        props.data.map((el) => {
            beautifyObj.push({
                'ticker': el[0],
                'price': el[1]
            })
        });
        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };
        // .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        // console.log('sort...', groupBy(beautifyObj, 'ticker'));
        const unique = [...new Set(beautifyObj.map(item => item.ticker))];
        // console.log('unique', unique);
        unique.map((el) =>{
            console.log('sort pls',groupBy(beautifyObj, 'ticker')[el].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
        });
        beautifyObj.map((el) => {
            debugger
            props.data.map((itm) => {
                if (itm[0] === el.ticker) {
                    if (itm[1] > el.price) {
                        calculatedObj.push({
                            'ticker': itm[0],
                            'price': itm[1],
                            'status': 'inc'
                        })
                    } else if (itm[1] < el.price) {
                        calculatedObj.push({
                            'ticker': itm[0],
                            'price': itm[1],
                            'status': 'dec'
                        })
                    } else {
                        calculatedObj.push({
                            'ticker': itm[0],
                            'price': itm[1],
                            'status': 'nor'
                        })
                    }
                }
            })
        });
        setCalObj(calculatedObj)
        // console.log('calculatedObj --->', calculatedObj);
        // console.log('Beautify --->', beautifyObj);
    }, [props]);

    const getCurrentTime = () => {
        var d = new Date();
        var day = days[d.getDay()];
        var hr = d.getHours();
        var min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var ampm = "am";
        if (hr > 12) {
            hr -= 12;
            ampm = "pm";
        }
        var date = d.getDate();
        var month = months[d.getMonth()];
        var year = d.getFullYear();
        return day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
    }
    return (
        <React.Fragment>
            {/* <h4>{props.data}</h4> */}
            <div className="antialiased font-sans">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl text-white font-semibold leading-tight">
                                <div className='flex items-center'>
                                    <div className='mr-1'>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl text-white font-semibold leading-tight">Live <span className='text-yellow-600'> Stocks </span> Update</h2>
                                    </div>
                                </div>
                            </h2>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-sm overflow-hidden">
                                <table className="min-w-full leading-normal ">
                                    <thead className='bg-white'>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                <div className='flex items-center'>
                                                    <div className='mr-1'>
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                                    </div>
                                                    <div>
                                                        ticker
                                                </div>
                                                </div>

                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                <div className='flex items-center'>
                                                    <div className='mr-1'>
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    </div>
                                                    <div>
                                                        Price
                                                </div>
                                                </div>


                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                <div className='flex items-center'>
                                                    <div className='mr-1'>
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    </div>
                                                    <div>
                                                        Last Updated
                                                </div>
                                                </div>

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            calObj.map((el, index) => {
                                                return (
                                                    <tr key={index} className={el.status == 'inc' ? 'bg-green-300' : el.status == 'dec' ? 'bg-red-300' : 'bg-gray-200 border-b-2 border-gray-300'}>
                                                        <td className="w-64 px-5 py-5 border-b border-gray-200 text-sm">
                                                            <div className="flex items-center">
                                                                <p className="text-blue-900 font-bold whitespace-no-wrap">{el.ticker.toUpperCase()}</p>
                                                            </div>
                                                        </td>
                                                        <td className={el.status == 'inc' ? 'w-64 px-5 py-5 border-b text-sm' : el.status == 'dec' ? 'w-64 px-5 py-5 border-b   text-sm' : 'w-64 px-5 py-5 border-b text-sm'}>
                                                            <div className="flex items-center text-gray-900 font-semibold whitespace-no-wrap">
                                                                <div className='mr-2'>
                                                                    {
                                                                        el.status == 'inc' ?
                                                                            <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                                                            :
                                                                            el.status == 'dec' ?
                                                                                <svg className="w-6 h-6 text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                                                                                :
                                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                                                    }
                                                                </div>
                                                                <div className='font-bold text-blue-600'>
                                                                    {el.price}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className=" px-5 py-5 border-b border-gray-200 text-sm">
                                                            <p className="text-gray-900 font-semibold whitespace-no-wrap">
                                                                {getCurrentTime()}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div
                                    className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                    <span className="text-xs xs:text-sm text-gray-900 font-bold">
                                        Showing {calObj.length} Entries
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LiveStocks;