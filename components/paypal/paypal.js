import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../store/orderslice';

export default function Paypal({
  price,
  user,
  order,
  orderDetails,
  renderPaypalButton,
  setOrderSent,
}) {
  const router = useRouter();
  const paypal = useRef();
  const newPrice = price.toFixed(2);
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userId: null,
    eventId: null,
    seatId: null,
  });

  useEffect(() => {
    setDetails({
      ...orderDetails,
      eventId: order.eventId,
      seatId: order.selectedSeats,
    });
  }, [orderDetails]);

  const sendOrder = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        body: JSON.stringify({
          firstName: details.firstName,
          lastName: details.lastName,
          phoneNumber: details.phoneNumber,
          email: details.email,
          userId: user.id ? user.id : null,
          eventId: order.eventId,
          seatId: order.selectedSeats,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setOrderSent(true);
        dispatch(orderActions.resetOrder());
        setTimeout(function () {
          router.replace('/');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderPaypalButton &&
      window.paypal
        .Buttons({
          createOrder: (data, actions, error) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description: 'Bilety na film',
                  amount: {
                    currency_code: 'PLN',
                    value: newPrice,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            sendOrder();
          },
          onError: (error) => {
            console.log(error);
          },
        })
        .render(paypal.current);
  }, [renderPaypalButton]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
