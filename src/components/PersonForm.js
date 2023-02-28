const PersonForm = (props) => {
    const { nameValue, nameFunc, numberVal, numberFunc, submitFunc} = props
  
    return (
      <form onSubmit={submitFunc}>
          <div>
            name: <input 
                    value={nameValue}
                    onChange={nameFunc} />
          </div>
          <div>
            number: <input
                      value={numberVal}
                      onChange={numberFunc} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default PersonForm  