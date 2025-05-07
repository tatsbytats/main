import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    residenceType: '',
    housingStatus: '',
    householdMembers: { adults: 1, children: 0, otherPets: '' },
    petExperience: '',
    petType: '',
    preferredAge: '',
    preferredSize: '',
    preferredBreed: '',
    veterinarianInfo: '',
    agreeTerms: false,
    subscribeNewsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('basic');

  const residenceTypes = ['Apartment', 'House', 'Townhouse', 'Mobile Home', 'Rural Property', 'Other'];
  const petTypes = ['Dog', 'Cat', 'Bird', 'Small Animal', 'Reptile', 'Other'];
  const agePreferences = ['Baby', 'Young', 'Adult', 'Senior', 'Any'];
  const sizePreferences = ['Small', 'Medium', 'Large', 'Any'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? parseInt(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }

    try {
      const { confirmPassword, agreeTerms, ...dataToSend } = formData;
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'basic':
        return (
          <>
            <h4 className="mb-3">Basic Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="firstName" name="firstName" 
                    placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                  <label htmlFor="firstName">First Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="lastName" name="lastName" 
                    placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" name="email" 
                placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="tel" className="form-control" id="phone" name="phone" 
                placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <label htmlFor="phone">Phone Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="address" name="address" 
                placeholder="Physical Address" value={formData.address} onChange={handleChange} required />
              <label htmlFor="address">Physical Address</label>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="password" name="password" 
                    placeholder="Password" value={formData.password} onChange={handleChange} required />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" 
                    placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" disabled>
                Previous
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setActiveSection('adoption')}>
                Next
              </button>
            </div>
          </>
        );

      case 'adoption':
        return (
          <>
            <h4 className="mb-3">Adoption Information</h4>
            
            <div className="form-floating mb-3">
              <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" 
                value={formData.dateOfBirth} onChange={handleChange} required />
              <label htmlFor="dateOfBirth">Date of Birth</label>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <select className="form-select" id="residenceType" name="residenceType" 
                    value={formData.residenceType} onChange={handleChange} required>
                    <option value="">Select...</option>
                    {residenceTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  <label htmlFor="residenceType">Type of Residence</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <select className="form-select" id="housingStatus" name="housingStatus" 
                    value={formData.housingStatus} onChange={handleChange} required>
                    <option value="">Select...</option>
                    <option value="own">Own</option>
                    <option value="rent">Rent</option>
                  </select>
                  <label htmlFor="housingStatus">Housing Status</label>
                </div>
              </div>
            </div>

            <h5 className="mb-3">Household Composition</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="number" className="form-control" id="adults" name="householdMembers.adults" 
                    min="1" value={formData.householdMembers.adults} onChange={handleChange} required />
                  <label htmlFor="adults">Number of Adults</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="number" className="form-control" id="children" name="householdMembers.children" 
                    min="0" value={formData.householdMembers.children} onChange={handleChange} required />
                  <label htmlFor="children">Number of Children</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="otherPets" name="householdMembers.otherPets" 
                placeholder="Other pets in your home" value={formData.householdMembers.otherPets} onChange={handleChange} />
              <label htmlFor="otherPets">Other Pets (if any)</label>
            </div>

            <div className="form-floating mb-3">
              <textarea className="form-control" id="petExperience" name="petExperience" 
                placeholder="Describe your previous experience with pets" style={{ height: '80px' }} 
                value={formData.petExperience} onChange={handleChange} required />
              <label htmlFor="petExperience">Previous Pet Experience</label>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => setActiveSection('basic')}>
                Previous
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setActiveSection('preferences')}>
                Next
              </button>
            </div>
          </>
        );

      case 'preferences':
        return (
          <>
            <h4 className="mb-3">Pet Preferences</h4>

            <div className="form-floating mb-3">
              <select className="form-select" id="petType" name="petType" 
                value={formData.petType} onChange={handleChange} required>
                <option value="">Select...</option>
                {petTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
              <label htmlFor="petType">Type of Pet</label>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select className="form-select" id="preferredAge" name="preferredAge" 
                    value={formData.preferredAge} onChange={handleChange}>
                    <option value="">Select...</option>
                    {agePreferences.map((age, index) => (
                      <option key={index} value={age}>{age}</option>
                    ))}
                  </select>
                  <label htmlFor="preferredAge">Preferred Age</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select className="form-select" id="preferredSize" name="preferredSize" 
                    value={formData.preferredSize} onChange={handleChange}>
                    <option value="">Select...</option>
                    {sizePreferences.map((size, index) => (
                      <option key={index} value={size}>{size}</option>
                    ))}
                  </select>
                  <label htmlFor="preferredSize">Preferred Size</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="preferredBreed" name="preferredBreed" 
                    placeholder="Preferred Breed" value={formData.preferredBreed} onChange={handleChange} />
                  <label htmlFor="preferredBreed">Preferred Breed</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="veterinarianInfo" name="veterinarianInfo" 
                placeholder="Veterinarian Reference (optional)" value={formData.veterinarianInfo} onChange={handleChange} />
              <label htmlFor="veterinarianInfo">Veterinarian Reference (optional)</label>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => setActiveSection('adoption')}>
                Previous
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setActiveSection('terms')}>
                Next
              </button>
            </div>
          </>
        );

      case 'terms':
        return (
          <>
            <h4 className="mb-3">Terms and Conditions</h4>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="agreeTerms" name="agreeTerms" 
                checked={formData.agreeTerms} onChange={handleChange} required />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="subscribeNewsletter" name="subscribeNewsletter" 
                checked={formData.subscribeNewsletter} onChange={handleChange} />
              <label className="form-check-label" htmlFor="subscribeNewsletter">
                Subscribe to our newsletter for pet adoption updates
              </label>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => setActiveSection('preferences')}>
                Previous
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Pet Adoption Registration</h2>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <button className={`btn btn-sm ${activeSection === 'basic' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveSection('basic')}>1. Basic Info</button>
                  <button className={`btn btn-sm ${activeSection === 'adoption' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveSection('adoption')}>2. Adoption Info</button>
                  <button className={`btn btn-sm ${activeSection === 'preferences' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveSection('preferences')}>3. Preferences</button>
                  <button className={`btn btn-sm ${activeSection === 'terms' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveSection('terms')}>4. Terms</button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                
                {renderSection()}
              </form>

              <div className="mt-3 text-center">
                <small className="text-muted">
                  Already have an account? <Link to="/login">Login here</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;