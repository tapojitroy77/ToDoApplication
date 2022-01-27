import firebase from './firebase';

export function insertData(refName: string, data: object): any {
    const dbRef = firebase.database().ref(refName);
    const response = dbRef.push(data);
    return response.key;
}

export function getData(refName: string, callback: (data: object) => void) {
    const dbRef = firebase.database().ref(refName);
    dbRef.on('value', data => {
        callback(data.val());
    });
}
export function updateData<T>(refName: string, id: string, updatedKey: string, updatedValue: T) {
    const dbRef = firebase.database().ref(refName).child(id);
    dbRef.update({
        [updatedKey]: updatedValue
    });
}
