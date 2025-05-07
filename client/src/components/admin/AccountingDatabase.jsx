import React from 'react';
import { Table, Row, Col, Button, Container, Card, Badge } from 'react-bootstrap';
import { CurrencyDollar, PencilSquare, Trash } from 'react-bootstrap-icons';
import { format } from 'date-fns';

const AccountingDatabase = ({ darkMode }) => {
  // Mock data
  const transactions = [
    { id: 'TX1001', date: '2023-08-01', description: 'Donation', amount: 250, type: 'income' },
    { id: 'TX1002', date: '2023-08-03', description: 'Vet Expense', amount: -75, type: 'expense' },
    { id: 'TX1003', date: '2023-08-05', description: 'Supplies Purchase', amount: -120, type: 'expense' },
    { id: 'TX1004', date: '2023-08-10', description: 'Fundraiser', amount: 500, type: 'income' },
    { id: 'TX1005', date: '2023-08-15', description: 'Staff Salary', amount: -350, type: 'expense' }
  ];

  const handleEdit = (id) => {
    console.log(`Edit transaction with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete transaction with ID: ${id}`);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'auto'
    }).format(amount);
  };

  // Transaction type badge renderer
  const renderTypeBadge = (type) => {
    let color, borderStyle, icon;

    if (type === 'income') {
      color = darkMode ? 'rgba(25, 135, 84, 0.9)' : 'rgba(25, 135, 84, 0.9)';
      borderStyle = darkMode ? '1px solid rgba(25, 135, 84, 0.5)' : '1px solid rgba(25, 135, 84, 0.5)';
      icon = <CurrencyDollar size={12} />;
    } else {
      color = darkMode ? 'rgba(220, 53, 69, 0.9)' : 'rgba(220, 53, 69, 0.9)';
      borderStyle = darkMode ? '1px solid rgba(220, 53, 69, 0.5)' : '1px solid rgba(220, 53, 69, 0.5)';
      icon = <CurrencyDollar size={12} />;
    }

    return (
      <Badge
        bg={darkMode ? "transparent" : "transparent"}
        className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
        style={{
          width: 'fit-content',
          border: borderStyle,
          color: color
        }}
      >
        {icon} {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold ${darkMode ? 'text-light' : 'text-deep-raspberry'}`}>Financial Transactions</h2>
        <Button
          variant={darkMode ? "info" : "deep-raspberry"}
          size="sm"
          className="px-3"
          style={{ borderRadius: '4px' }}
        >
          Add Transaction
        </Button>
      </div>

      {/* Summary cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card
            className={`h-100 border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{
              borderRadius: '10px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className={`${darkMode ? 'text-light-emphasis' : 'text-secondary'} mb-0 fs-6`}>
                  Total Income
                </Card.Title>
                <div className={`rounded-circle p-2 ${darkMode ? 'bg-success bg-opacity-10' : 'bg-success bg-opacity-10'}`}>
                  <CurrencyDollar size={18} className="text-success" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="fw-bold mb-0 text-success">
                  {formatAmount(transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0))}
                </h3>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className={`h-100 border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{
              borderRadius: '10px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className={`${darkMode ? 'text-light-emphasis' : 'text-secondary'} mb-0 fs-6`}>
                  Total Expenses
                </Card.Title>
                <div className={`rounded-circle p-2 ${darkMode ? 'bg-danger bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                  <CurrencyDollar size={18} className="text-danger" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="fw-bold mb-0 text-danger">
                  {formatAmount(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))}
                </h3>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className={`h-100 border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{
              borderRadius: '10px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className={`${darkMode ? 'text-light-emphasis' : 'text-secondary'} mb-0 fs-6`}>
                  Net Balance
                </Card.Title>
                <div className={`rounded-circle p-2 ${darkMode ? 'bg-info bg-opacity-10' : 'bg-deep-raspberry bg-opacity-10'}`}>
                  <CurrencyDollar size={18} className={darkMode ? 'text-info' : 'text-deep-raspberry'} />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="fw-bold mb-0">
                  {formatAmount(transactions.reduce((sum, t) => sum + t.amount, 0))}
                </h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Transactions count badge */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Badge
          bg={darkMode ? "info" : "deep-raspberry"}
          className="rounded-pill px-3 py-2"
        >
          {transactions.length} Transactions
        </Badge>
      </div>

      {/* Clean table */}
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
              <th className="fw-medium fs-6 ps-3">Transaction ID</th>
              <th className="fw-medium fs-6">Date</th>
              <th className="fw-medium fs-6">Description</th>
              <th className="fw-medium fs-6">Type</th>
              <th className="fw-medium fs-6">Amount</th>
              <th className="fw-medium fs-6 text-end pe-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={darkMode ? 'border-bottom border-secondary' : index % 2 === 0 ? 'bg-white' : 'bg-light'}
              >
                <td className="ps-3 py-2">
                  {transaction.id}
                </td>
                <td className="py-2">{formatDate(transaction.date)}</td>
                <td className="py-2">{transaction.description}</td>
                <td className="py-2">{renderTypeBadge(transaction.type)}</td>
                <td className="py-2" style={{
                  color: transaction.amount > 0
                    ? (darkMode ? 'rgba(25, 235, 84, 0.9)' : 'rgba(25, 135, 84, 0.9)')
                    : (darkMode ? 'rgba(220, 53, 69, 0.9)' : 'rgba(220, 53, 69, 0.9)')
                }}>
                  {formatAmount(transaction.amount)}
                </td>
                <td className="text-end pe-3 py-2">
                  <div className="d-flex gap-2 justify-content-end">
                    <Button
                      variant="link"
                      onClick={() => handleEdit(transaction.id)}
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
                      onClick={() => handleDelete(transaction.id)}
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
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AccountingDatabase;
