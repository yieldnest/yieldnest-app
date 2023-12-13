const YNETH_POOL_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes32', name: 'neededRole', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'DoesNotReceiveETH', type: 'error' },
  { inputs: [], name: 'InvalidConfiguration', type: 'error' },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'InvalidDepositRoot',
    type: 'error',
  },
  { inputs: [], name: 'InvalidInitialization', type: 'error' },
  {
    inputs: [{ internalType: 'bytes12', name: '', type: 'bytes12' }],
    name: 'InvalidWithdrawalCredentialsNotETH1',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'InvalidWithdrawalCredentialsWrongAddress',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'InvalidWithdrawalCredentialsWrongLength',
    type: 'error',
  },
  { inputs: [], name: 'MathOverflowedMulDiv', type: 'error' },
  { inputs: [], name: 'MaximumValidatorDepositExceeded', type: 'error' },
  { inputs: [], name: 'MaximumynETHSupplyExceeded', type: 'error' },
  { inputs: [], name: 'MinimumStakeBoundNotSatisfied', type: 'error' },
  { inputs: [], name: 'MinimumUnstakeBoundNotSatisfied', type: 'error' },
  { inputs: [], name: 'MinimumValidatorDepositNotSatisfied', type: 'error' },
  { inputs: [], name: 'NotEnoughDepositETH', type: 'error' },
  { inputs: [], name: 'NotEnoughUnallocatedETH', type: 'error' },
  { inputs: [], name: 'NotInitializing', type: 'error' },
  { inputs: [], name: 'NotReturnsAggregator', type: 'error' },
  { inputs: [], name: 'NotUnstakeRequestsManager', type: 'error' },
  { inputs: [], name: 'Paused', type: 'error' },
  { inputs: [], name: 'PreviouslyUsedValidator', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'methAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'expectedMinimum', type: 'uint256' },
    ],
    name: 'StakeBelowMinimumynETHAmount',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'ethAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'expectedMinimum', type: 'uint256' },
    ],
    name: 'UnstakeBelowMinimumETHAmount',
    type: 'error',
  },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'staker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'mETHAmount',
        type: 'uint256',
      },
    ],
    name: 'Staked',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minynETHAmount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'ethAmount', type: 'uint256' }],
    name: 'ethToynETH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'exchangeAdjustmentRate',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'admin', type: 'address' },
          { internalType: 'contract IynETH', name: 'ynETH', type: 'address' },
          {
            internalType: 'contract IDepositContract',
            name: 'depositContract',
            type: 'address',
          },
        ],
        internalType: 'struct DepositPool.Init',
        name: 'init',
        type: 'tuple',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isStakingPaused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maximumynETHSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minimumStakeBound',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'callerConfirmation', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalControlled',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export default YNETH_POOL_ABI
