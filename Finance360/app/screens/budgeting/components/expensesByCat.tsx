import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format } from 'date-fns';
import { View, Text } from 'react-native';

