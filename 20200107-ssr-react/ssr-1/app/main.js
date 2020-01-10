import React from 'react'
 
export default class Home extends React.Component {
 render () {
  return <div onClick={() => window.alert(123)}>hello world</div>
 }
}