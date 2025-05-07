import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Badge, Spinner, Alert } from 'react-bootstrap';
import { CheckCircle, XCircle, PencilSquare, Trash } from 'react-bootstrap-icons';
import { format } from 'date-fns';
import { getUsers, deleteUser } from '../../services/userService';

const AccountDatabase = ({ darkMode }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();

        // Transform the data to match our component's expected format
        const formattedUsers = data.map(user => ({
          id: user._id,
          name: user.username, // Using username as name
          email: `${user.username.toLowerCase().replace(/\s+/g, '.')}@example.com`, // Generate mock email
          role: user.role.charAt(0).toUpperCase() + user.role.slice(1), // Capitalize role
          lastLogin: user.lastLogin,
          status: user.status
        }));

        setAccounts(formattedUsers);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load user accounts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit account with ID: ${id}`);
    // In a real application, this would navigate to an edit form or open a modal
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setAccounts(accounts.filter(account => account.id !== id));
        setDeleteSuccess('User deleted successfully');

        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess(null);
        }, 3000);
      } catch (err) {
        console.error('Failed to delete user:', err);
        setError('Failed to delete user. Please try again.');

        // Clear error message after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <Badge
            bg={darkMode ? "transparent" : "transparent"}
            className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
            style={{
              width: 'fit-content',
              border: darkMode ? '1px solid rgba(25, 135, 84, 0.5)' : '1px solid rgba(25, 135, 84, 0.5)',
              color: darkMode ? 'rgba(25, 235, 84, 0.9)' : 'rgba(25, 135, 84, 0.9)'
            }}
          >
            <CheckCircle size={10} /> Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge
            bg={darkMode ? "transparent" : "transparent"}
            className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
            style={{
              width: 'fit-content',
              border: darkMode ? '1px solid rgba(108, 117, 125, 0.5)' : '1px solid rgba(108, 117, 125, 0.5)',
              color: darkMode ? 'rgba(173, 181, 189, 0.9)' : 'rgba(108, 117, 125, 0.9)'
            }}
          >
            <XCircle size={10} /> Inactive
          </Badge>
        );
      default:
        return null;
    }
  };

  // Role badge renderer
  const renderRoleBadge = (role) => {
    let color;
    let borderStyle;
    switch(role) {
      case 'Admin':
        color = darkMode ? 'rgba(13, 110, 253, 0.9)' : 'rgba(13, 110, 253, 0.9)';
        borderStyle = darkMode ? '1px solid rgba(13, 110, 253, 0.5)' : '1px solid rgba(13, 110, 253, 0.5)';
        break;
      case 'Editor':
        color = darkMode ? 'rgba(111, 66, 193, 0.9)' : 'rgba(111, 66, 193, 0.9)';
        borderStyle = darkMode ? '1px solid rgba(111, 66, 193, 0.5)' : '1px solid rgba(111, 66, 193, 0.5)';
        break;
      case 'Viewer':
        color = darkMode ? 'rgba(102, 16, 242, 0.9)' : 'rgba(102, 16, 242, 0.9)';
        borderStyle = darkMode ? '1px solid rgba(102, 16, 242, 0.5)' : '1px solid rgba(102, 16, 242, 0.5)';
        break;
      default:
        color = darkMode ? 'rgba(108, 117, 125, 0.9)' : 'rgba(108, 117, 125, 0.9)';
        borderStyle = darkMode ? '1px solid rgba(108, 117, 125, 0.5)' : '1px solid rgba(108, 117, 125, 0.5)';
    }

    return (
      <Badge
        bg={darkMode ? "transparent" : "transparent"}
        className="rounded-pill px-2 py-1"
        style={{
          width: 'fit-content',
          border: borderStyle,
          color: color
        }}
      >
        {role}
      </Badge>
    );
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold ${darkMode ? 'text-light' : 'text-deep-raspberry'}`}>User Accounts</h2>
        <Button
          variant={darkMode ? "info" : "deep-raspberry"}
          size="sm"
          className="px-3"
          style={{ borderRadius: '4px' }}
        >
          Add Account
        </Button>
      </div>

      {/* Success and error messages */}
      {error && (
        <Alert variant="danger" className="mb-3" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {deleteSuccess && (
        <Alert variant="success" className="mb-3" onClose={() => setDeleteSuccess(null)} dismissible>
          {deleteSuccess}
        </Alert>
      )}

      {/* Accounts count badge */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Badge
          bg={darkMode ? "info" : "deep-raspberry"}
          className="rounded-pill px-3 py-2"
        >
          {accounts.length} Accounts
        </Badge>
      </div>

      {/* Loading spinner */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant={darkMode ? "light" : "deep-raspberry"}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className={`mt-2 ${darkMode ? 'text-light' : ''}`}>Loading accounts...</p>
        </div>
      ) : (
        /* Clean table */
        <div className="table-responsive">
          <Table
            hover
            className={`align-middle ${darkMode ? 'text-light table-dark' : 'table-striped'}`}
            style={{
              borderCollapse: 'collapse'
            }}
          >
            <thead>
              <tr className={darkMode ? 'text-light-emphasis border-bottom border-secondary' : 'text-secondary border-bottom'}>
                <th className="fw-medium fs-6 ps-3">User ID</th>
                <th className="fw-medium fs-6">Name</th>
                <th className="fw-medium fs-6">Email</th>
                <th className="fw-medium fs-6">Role</th>
                <th className="fw-medium fs-6">Last Login</th>
                <th className="fw-medium fs-6">Status</th>
                <th className="fw-medium fs-6 text-end pe-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    {error ? 'Error loading accounts' : 'No accounts found'}
                  </td>
                </tr>
              ) : (
                accounts.map((account, index) => (
                  <tr
                    key={account.id}
                    className={darkMode ? 'border-bottom border-secondary' : index % 2 === 0 ? 'bg-white' : 'bg-light'}
                  >
                    <td className="ps-3 py-2">
                      {account.id}
                    </td>
                    <td className="py-2">{account.name}</td>
                    <td className="py-2">{account.email}</td>
                    <td className="py-2">{renderRoleBadge(account.role)}</td>
                    <td className="py-2">{formatDate(account.lastLogin)}</td>
                    <td className="py-2">
                      {renderStatusBadge(account.status)}
                    </td>
                    <td className="text-end pe-3 py-2">
                      <div className="d-flex gap-2 justify-content-end">
                        <Button
                          variant="link"
                          onClick={() => handleEdit(account.id)}
                          className="d-flex align-items-center justify-content-center p-0"
                          style={{
                            width: '28px',
                            height: '28px'
                          }}
                        >
                          <PencilSquare size={15} className={darkMode ? "text-warning" : "text-warning"} />
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDelete(account.id)}
                          className="d-flex align-items-center justify-content-center p-0"
                          style={{
                            width: '28px',
                            height: '28px'
                          }}
                        >
                          <Trash size={15} className="text-danger" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default AccountDatabase;
