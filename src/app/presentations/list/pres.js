const presentations = [
  {
    "claims": {
      "verifiable": {
        "emailMain": {
          "iss": [
            {
              "did": "did:web:uport.claims",
              "url": "https://uport.claims/email"
            },
            {
              "did": "did:web:sobol.io",
              "url": "https://sobol.io/verify"
            }
          ],
          "reason": "Whe need to be able to email you"
        },
        "nationalId": {
          "essential": true,
          "iss": [
            {
              "did": "did:web:idverifier.claims",
              "url": "https://idverifier.example"
            }
          ],
          "reason": "To legally be able to open your account"
        }
      }
    },
    "_id": "61a8d7aefa1a820f30f19fb4",
    "name": "ShareReq Uno",
    "__v": 0
  },
  {
    "claims": {
      "verifiable": {
        "legalAddress": {
          "iss": [
            {
              "did": "did:web:uport.claims",
              "url": "https://uport.claims/email"
            },
            {
              "did": "did:web:sobol.io",
              "url": "https://sobol.io/verify"
            }
          ],
          "reason": "Whe need to be able to email you"
        },
        "mobilePhone": {
          "essential": true,
          "iss": [
            {
              "did": "did:web:idverifier.claims",
              "url": "https://idverifier.example"
            }
          ],
          "reason": "To legally be able to open your account"
        }
      }
    },
    "_id": "61a8d7cc7c47122c62d8c485",
    "name": "La Dos",
    "__v": 0
  },
  {
    "claims": {
      "verifiable": {
        "emailMain": {
          "iss": [
            {
              "did": "did:web:uport.claims",
              "url": "https://uport.claims/email"
            },
            {
              "did": "did:web:sobol.io",
              "url": "https://sobol.io/verify"
            }
          ],
          "reason": "Whe need to be able to email you"
        },
        "nationalId": {
          "essential": true,
          "iss": [
            {
              "did": "did:web:idverifier.claims",
              "url": "https://idverifier.example"
            }
          ],
          "reason": "To legally be able to open your account"
        }
      }
    },
    "_id": "61a8d7f613d5586a1ce49b15",
    "name": "Y Tres",
    "__v": 0
  }
];

module.exports = {
  presentations,
}