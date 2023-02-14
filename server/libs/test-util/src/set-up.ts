import 'jest-extended';
import 'jest-extended/all';
import iconv from 'iconv-lite';


jest.setTimeout(20000);
iconv.encodingExists('foo');