var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date'},
  { value : 'host', title: 'Host'}
]

var reduce = function(row, memo) {
  switch( row.type ) {
    case 'impression' :
      memo.totalImpressions = (memo.totalImpressions || 0) + 1;
      break;
    case 'display':
      memo.totalDisplay = (memo.totalDisplay || 0 ) + 1;
      break;
    case 'load' :
      memo.totalLoad = (memo.totalLoad || 0 ) + 1;
      break;
  }
  memo.loadRate = memo.totalLoad/memo.totalImpressions;
  memo.displayRate = memo.totalDisplay/memo.totalLoad;
  return memo
}

var calculations = [
  {
    title: 'Impressions', value: 'totalImpressions',
    template: function(val, row) {
      return val;
    }
  },
  {
    title : 'Load', value: 'totalLoad',
    template : function (val, row) {
      return val
    }
  },
  {
    title : 'Display', value: 'totalDisplay',
    template : function (val, row) {
      return val
    }
  },
  {
    title : 'Load Rate', value: 'loadRate',
    template : function (val, row) {
      return (val * 100).toFixed(1) + '%'
    }
  },
  {
    title : 'Display Rate', value: 'displayRate',
    template : function (val, row) {
      return (val * 100).toFixed(1) + '%'
    }
  }
]

module.exports = createReactClass({
  render () {
    return <div>
      <ReactPivot rows={rows}
              dimensions={dimensions}
              reduce={reduce}
              calculations={calculations}
              nPaginateRows={25} />
    </div>
  }
})
