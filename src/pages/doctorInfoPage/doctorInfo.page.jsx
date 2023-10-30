import React, { useState } from 'react'
import { TabsDoctorsComponents } from '../../components';

export const DoctorInfoPage = ({doctor}) => {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <TabsDoctorsComponents doctor={doctor} />
    </section>
  );
}
