import ReactDOM from 'react-dom';


function TestA() {
    return ReactDOM.createPortal(<div className="test-a">
        <h1>TestA</h1>
        <TestB />
    </div>, document.querySelector('.modal'))
}

function TestB() {
    return <div className="test-b">
        <h1>TestB</h1>
    </div>
}

export default function Test() {
  return (
    <div className="test" onClick={e => {
        console.log('test被点击了', e.target)
    }}>
        <h1>Test</h1>
        <TestA />
    </div>
  )
}
