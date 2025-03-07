import './symbols.css'

//in style you can pass a class to modify color or other styles

export const SymbolX = (style = '') => {
    return (
        <div className='symbolX'>
            <div className={`main-diagonal ${style}`}></div>
            <div className={`secondary-diagonal ${style}`}></div>
        </div>
    )
}

export const SymbolO = (style = '') => {
    return (
        <div className='symbolO'>
            <div className={`main ${style}`}></div>
        </div>
    )
}

