export interface IGroupOrderInfoParams {
  groupOrderId?: string;
}

export default async function getGroupOrderInfo(params: IGroupOrderInfoParams) {
  const { groupOrderId } = params;

  return await fetch(`${process.env.API_URL}/app/group-order/${groupOrderId}`, {
    next: {
      revalidate: 60,
    },
  })
    .then((res) => {
      const data = res.json();
      return data;
    })
    .catch((error) => {
      console.log('error getGroupOrderInfo', error);
    });
}
