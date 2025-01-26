import React from 'react'

function User({user}) {

  return (
        <div>{user.username} has {user.blogs.length} blogs</div>
  )
}

export default User