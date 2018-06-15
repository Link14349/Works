#include <iostream>
#include <cstdio>
#include <stack>
using namespace std;

int main()
{
	stack<int> station;
	int length,tmp;
	cin >> length;
	char _log[length * 2 + 2][10];
	int ID_in[length];
	int ID_out[length];
	int nowPos = 0;
	int pos = 1;
	for (int i = 0 ; i < length ; i++){
		cin >> ID_in[i];
	}
	for (int i = 0 ; i < length ; i++){
		cin >> ID_out[i];
	}
	for (int i = 0 ; i < length ; i++)
	{
		station.push(ID_in[i]);
		_log[pos][0] = 'i';
		_log[pos][1] = 'n';
		_log[pos][2] = '\0';
		pos++;
		while (!station.empty() && station.top() == ID_out[nowPos])
		{
			_log[pos][0] = 'o';
			_log[pos][1] = 'u';
			_log[pos][2] = 't';
			_log[pos][3] = '\0';
			station.pop();
			nowPos++;
			pos++;
		}
	}
	if (station.empty()){
		_log[0][0] = 'y';
		_log[0][1] = 'e';
		_log[0][2] = 's';
		_log[pos][3] = '\0';
	} else {
		_log[pos][0] = 'n';
		_log[pos][1] = 'o';
		_log[pos][2] = '\0';
	}
	for (int i = 0 ; i < (2 * length + 1) ; i++)
		cout << _log[i] << endl;
	cout << "end" << endl;
	return 0;
}