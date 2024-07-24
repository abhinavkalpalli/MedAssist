import { Schema, Document, model } from 'mongoose';


export interface ISlot extends Document {
  doctorId: Schema.Types.ObjectId;
  date: Date;
  shifts: ('9am-10am' | '11am-12pm' | '2pm-3pm' | '5pm-6pm' | '8pm-9pm')[];
}


const slotSchema = new Schema<ISlot>({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctors',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shifts: [
    {
      type: String,
      enum: ['9am-10am', '11am-12pm', '2pm-3pm', '5pm-6pm', '8pm-9pm'],
      required: true,
    },
  ],
});


const Slots = model<ISlot>('Slot', slotSchema);

export default Slots;
