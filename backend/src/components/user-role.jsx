// components/my-role-editor.jsx

import React from 'react'
import { Box, Label, Select } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'

const api = new ApiClient()

const UserRole = (props) => {
  const { record, onChange } = props
  const [roles, setRoles] = React.useState([])

  React.useEffect(() => {
    // Fetch all roles from your API
    api.resourceAction({ resourceId: 'Role', actionName: 'list' }).then(response => {
      setRoles(response.data.records)
    })
  }, [])


  const handleChange = (event) => {
    // Update the record with the selected roles
    const selectedRoles = event.target.value
    onChange({
      ...record,
      params: {
        ...record.params,
        role: selectedRoles
      },
      populated: {
        ...record.populated,
        role: roles.filter(role => selectedRoles.includes(role.id))
      }
    })
  }

  return (
    <Box variant="grey">
      <Label>User</Label>
      <Select
        value={record.params.role || []}
        onChange={handleChange}
        multiple // add this property
      >
        {roles.map(role => (
          <option key={role.id} value={role.id}>{role.params.title}</option>
        ))}
      </Select>
    </Box>
  )
}

export default UserRole
