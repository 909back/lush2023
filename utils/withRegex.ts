class withRegex {
    isValue = (val:any)=> !val.toString().trim() ? false : true
}

export default withRegex