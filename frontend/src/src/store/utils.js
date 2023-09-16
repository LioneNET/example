
const getFullName = module => {
    const full_name = {}
    for (const field in module) {
        full_name[field] = `${module.NAME}/${field}`
    }
    return full_name
}

export {
    getFullName
}