import {React, useState} from 'react';
import approveDepositAPI from './approveDepositAPI' ;

const DepositModal = ({ isOpen, onClose,depositUuid,getDepositsAPI }) => {

  const [statusText, setstatusText] = useState('');
  const [loading, setloading] = useState(false);
  const [warningText, setwarningText]=  useState('Are you sure of this ?');


  const depositSuccess = ()=>{
    // setwarningText('')
    setstatusText("APPROVED!")

  }

  const errorSubmit = ()=>{
    onClose()

  }
  const depositApproval = ()=>{
    // setwarningText('')
    setstatusText("Approving...")
    approveDepositAPI(depositUuid, depositSuccess, errorSubmit)
    setloading(true)
    getDepositsAPI()

  }


  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <p style={{ color: '#009396', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
       <small>{warningText}</small>
            <div>{statusText}</div>
            </p>

           {!loading &&  <button
          onClick={()=>{depositApproval(depositUuid)}}
              style={{
                backgroundColor: '#009396',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px',
                border: 'none',
                fontSize: '16px',
              }}
            >
              Approve
            </button>}

            <button
              onClick={onClose}
              style={{
                backgroundColor: '#009396',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
                border: 'none',
                fontSize: '16px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DepositModal;
