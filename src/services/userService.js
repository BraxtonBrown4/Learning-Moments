export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}&_embed=posts`).then((res) =>
    res.json()
  )
}

export const updateUserById = (user) => {
  return fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  })
}